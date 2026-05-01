'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { ResizableImage } from './ResizableImage';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle, Color, BackgroundColor } from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { Youtube } from '@tiptap/extension-youtube';
import { useEffect, useRef, useState, useCallback } from 'react';
import { EditorToolbar } from './EditorToolbar';
import './editor.css';

interface RichEditorProps {
    value: string;
    onChange: (html: string) => void;
    placeholder?: string;
    autoSaveKey?: string;
    minHeight?: number;
}

const AUTO_SAVE_DEBOUNCE_MS = 1500;

export function RichEditor({
    value,
    onChange,
    placeholder = '내용을 입력하세요. 이미지는 드래그·붙여넣기·툴바 버튼으로 추가하실 수 있습니다.',
    autoSaveKey,
    minHeight = 320,
}: RichEditorProps) {
    const [uploading, setUploading] = useState(false);
    const [draftRestored, setDraftRestored] = useState(false);
    const [draftAvailable, setDraftAvailable] = useState<string | null>(null);
    const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const onChangeRef = useRef(onChange);
    onChangeRef.current = onChange;

    // Detect existing draft on mount (for restore prompt)
    useEffect(() => {
        if (!autoSaveKey) return;
        try {
            const draft = localStorage.getItem(autoSaveKey);
            if (draft && draft !== value && draft.trim() !== '' && draft !== '<p></p>') {
                setDraftAvailable(draft);
            }
        } catch { }
    }, [autoSaveKey, value]);

    const uploadFile = useCallback(async (file: File): Promise<string | null> => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            const res = await fetch('/api/upload', { method: 'POST', body: formData });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || '업로드 실패');
            return data.url as string;
        } catch (err) {
            console.error('upload error:', err);
            return null;
        }
    }, []);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                link: { openOnClick: false, autolink: true, HTMLAttributes: { class: 'rich-link' } },
                heading: { levels: [1, 2, 3] },
                codeBlock: { HTMLAttributes: { class: 'rich-codeblock' } },
            }),
            ResizableImage.configure({ inline: false, allowBase64: false, HTMLAttributes: { class: 'rich-image' } }),
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            TextStyle,
            Color,
            BackgroundColor,
            Highlight.configure({ multicolor: true }),
            Placeholder.configure({ placeholder, emptyEditorClass: 'is-editor-empty' }),
            CharacterCount,
            Table.configure({ resizable: true, HTMLAttributes: { class: 'rich-table' } }),
            TableRow,
            TableHeader,
            TableCell,
            Youtube.configure({ width: 720, height: 405, HTMLAttributes: { class: 'rich-youtube' } }),
        ],
        content: value || '',
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: 'rich-editor-content',
                spellcheck: 'false',
            },
            handleDrop: (view, event, _slice, moved) => {
                if (moved) return false;
                const files = Array.from(event.dataTransfer?.files ?? []).filter((f) => f.type.startsWith('image/'));
                if (files.length === 0) return false;
                event.preventDefault();
                (async () => {
                    setUploading(true);
                    for (const file of files) {
                        const url = await uploadFile(file);
                        if (url && editor) {
                            editor.chain().focus().setImage({ src: url, alt: file.name }).run();
                        }
                    }
                    setUploading(false);
                })();
                return true;
            },
            handlePaste: (_view, event) => {
                const items = Array.from(event.clipboardData?.items ?? []);
                const imageItem = items.find((i) => i.type.startsWith('image/'));
                if (!imageItem) return false;
                const file = imageItem.getAsFile();
                if (!file) return false;
                event.preventDefault();
                (async () => {
                    setUploading(true);
                    const url = await uploadFile(file);
                    if (url && editor) {
                        editor.chain().focus().setImage({ src: url, alt: file.name || 'pasted image' }).run();
                    }
                    setUploading(false);
                })();
                return true;
            },
        },
        onUpdate({ editor }) {
            const html = editor.getHTML();
            onChangeRef.current(html);

            // Auto-save (debounced)
            if (autoSaveKey) {
                if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
                autoSaveTimer.current = setTimeout(() => {
                    try {
                        localStorage.setItem(autoSaveKey, html);
                    } catch { }
                }, AUTO_SAVE_DEBOUNCE_MS);
            }
        },
    });

    // Sync external value -> editor (e.g. when loading from API in edit page)
    useEffect(() => {
        if (!editor) return;
        if (value && value !== editor.getHTML()) {
            editor.commands.setContent(value, { emitUpdate: false });
        }
    }, [editor, value]);

    const restoreDraft = () => {
        if (!editor || !draftAvailable) return;
        editor.commands.setContent(draftAvailable);
        onChangeRef.current(draftAvailable);
        setDraftAvailable(null);
        setDraftRestored(true);
    };

    const discardDraft = () => {
        if (autoSaveKey) {
            try { localStorage.removeItem(autoSaveKey); } catch { }
        }
        setDraftAvailable(null);
    };

    const handleImageButton = useCallback(() => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.multiple = true;
        input.onchange = async (e) => {
            const files = Array.from((e.target as HTMLInputElement).files ?? []);
            if (files.length === 0 || !editor) return;
            setUploading(true);
            for (const file of files) {
                const url = await uploadFile(file);
                if (url) editor.chain().focus().setImage({ src: url, alt: file.name }).run();
            }
            setUploading(false);
        };
        input.click();
    }, [editor, uploadFile]);

    const handleYoutubeButton = useCallback(() => {
        if (!editor) return;
        const url = window.prompt('YouTube 또는 Vimeo URL을 입력하세요');
        if (!url) return;
        editor.chain().focus().setYoutubeVideo({ src: url }).run();
    }, [editor]);

    const handleLinkButton = useCallback(() => {
        if (!editor) return;
        const previousUrl = editor.getAttributes('link').href as string | undefined;
        const url = window.prompt('링크 URL', previousUrl ?? 'https://');
        if (url === null) return;
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }
        editor.chain().focus().extendMarkRange('link').setLink({ href: url, target: '_blank' }).run();
    }, [editor]);

    const charCount = editor?.storage.characterCount?.characters() ?? 0;
    const wordCount = editor?.storage.characterCount?.words() ?? 0;

    return (
        <div className="rich-editor-shell">
            {draftAvailable && !draftRestored && (
                <div className="flex items-center justify-between gap-3 px-4 py-2.5 bg-amber-500/10 border border-amber-500/30 rounded-t-xl text-amber-300 text-sm">
                    <span>💡 자동 저장된 초안이 있습니다. 복원하시겠습니까?</span>
                    <div className="flex gap-2">
                        <button type="button" onClick={restoreDraft} className="px-3 py-1 rounded-md bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-xs">복원</button>
                        <button type="button" onClick={discardDraft} className="px-3 py-1 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-400">버리기</button>
                    </div>
                </div>
            )}

            <EditorToolbar
                editor={editor}
                onImage={handleImageButton}
                onYoutube={handleYoutubeButton}
                onLink={handleLinkButton}
                uploading={uploading}
            />

            <div className="rich-editor-body" style={{ minHeight }}>
                <EditorContent editor={editor} />
                {uploading && (
                    <div className="rich-editor-uploading">
                        <span className="rich-spinner" /> 이미지 업로드 중…
                    </div>
                )}
            </div>

            <div className="rich-editor-footer">
                <span>{charCount.toLocaleString()} 자 · {wordCount.toLocaleString()} 단어</span>
                {autoSaveKey && (
                    <span className="text-emerald-400/70">자동 저장 활성화</span>
                )}
            </div>
        </div>
    );
}
