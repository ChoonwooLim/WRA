'use client';

import { Editor } from '@tiptap/react';
import {
    Bold, Italic, Underline, Strikethrough, Code, List, ListOrdered,
    Quote, Heading1, Heading2, Heading3, AlignLeft, AlignCenter, AlignRight,
    AlignJustify, Image as ImageIcon, Link as LinkIcon, Youtube as YoutubeIcon,
    Undo2, Redo2, Minus, Table as TableIcon, Highlighter, Palette,
    SquareCode, Eraser, Loader2,
} from 'lucide-react';
import { useState } from 'react';

interface ToolbarProps {
    editor: Editor | null;
    onImage: () => void;
    onYoutube: () => void;
    onLink: () => void;
    uploading: boolean;
}

const COLORS = [
    '#ffffff', '#d1d5db', '#9ca3af', '#6b7280',
    '#ef4444', '#f97316', '#eab308', '#84cc16',
    '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6',
    '#ec4899', '#d4af37',
];

const HIGHLIGHT_COLORS = [
    'transparent', '#fef08a', '#fdba74', '#fca5a5',
    '#86efac', '#7dd3fc', '#c4b5fd', '#f9a8d4',
];

function ToolButton({
    onClick, active, disabled, title, children,
}: {
    onClick: () => void;
    active?: boolean;
    disabled?: boolean;
    title: string;
    children: React.ReactNode;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            title={title}
            className={`tool-btn ${active ? 'tool-btn-active' : ''}`}
        >
            {children}
        </button>
    );
}

function Divider() {
    return <span className="tool-divider" />;
}

export function EditorToolbar({ editor, onImage, onYoutube, onLink, uploading }: ToolbarProps) {
    const [colorOpen, setColorOpen] = useState(false);
    const [highlightOpen, setHighlightOpen] = useState(false);

    if (!editor) {
        return (
            <div className="rich-editor-toolbar opacity-50">
                <span className="text-xs text-gray-500 px-2">에디터 로딩 중…</span>
            </div>
        );
    }

    const setColor = (color: string) => {
        editor.chain().focus().setColor(color).run();
        setColorOpen(false);
    };

    const setHighlight = (color: string) => {
        if (color === 'transparent') {
            editor.chain().focus().unsetHighlight().run();
        } else {
            editor.chain().focus().toggleHighlight({ color }).run();
        }
        setHighlightOpen(false);
    };

    const insertTable = () => {
        editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
    };

    return (
        <div className="rich-editor-toolbar">
            <div className="flex flex-wrap items-center gap-1">
                <ToolButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="되돌리기 (Ctrl+Z)"><Undo2 className="w-4 h-4" /></ToolButton>
                <ToolButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="다시실행 (Ctrl+Y)"><Redo2 className="w-4 h-4" /></ToolButton>

                <Divider />

                <ToolButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })} title="제목 1"><Heading1 className="w-4 h-4" /></ToolButton>
                <ToolButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="제목 2"><Heading2 className="w-4 h-4" /></ToolButton>
                <ToolButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="제목 3"><Heading3 className="w-4 h-4" /></ToolButton>

                <Divider />

                <ToolButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="굵게 (Ctrl+B)"><Bold className="w-4 h-4" /></ToolButton>
                <ToolButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="기울임 (Ctrl+I)"><Italic className="w-4 h-4" /></ToolButton>
                <ToolButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="밑줄 (Ctrl+U)"><Underline className="w-4 h-4" /></ToolButton>
                <ToolButton onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} title="취소선"><Strikethrough className="w-4 h-4" /></ToolButton>
                <ToolButton onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive('code')} title="인라인 코드"><Code className="w-4 h-4" /></ToolButton>

                <Divider />

                {/* Text color */}
                <div className="relative">
                    <ToolButton onClick={() => { setColorOpen((v) => !v); setHighlightOpen(false); }} title="글자 색상">
                        <Palette className="w-4 h-4" />
                    </ToolButton>
                    {colorOpen && (
                        <div className="absolute z-30 mt-1 left-0 p-2 rounded-lg bg-[#0d1230] border border-white/15 shadow-xl grid grid-cols-7 gap-1.5">
                            {COLORS.map((c) => (
                                <button
                                    key={c}
                                    type="button"
                                    onClick={() => setColor(c)}
                                    title={c}
                                    className="w-5 h-5 rounded border border-white/20 hover:scale-110 transition-transform"
                                    style={{ backgroundColor: c }}
                                />
                            ))}
                            <button
                                type="button"
                                onClick={() => { editor.chain().focus().unsetColor().run(); setColorOpen(false); }}
                                title="색상 제거"
                                className="col-span-7 mt-1 px-2 py-1 text-xs rounded bg-white/5 hover:bg-white/10 text-gray-300 flex items-center gap-1 justify-center"
                            >
                                <Eraser className="w-3 h-3" /> 초기화
                            </button>
                        </div>
                    )}
                </div>

                {/* Highlight */}
                <div className="relative">
                    <ToolButton onClick={() => { setHighlightOpen((v) => !v); setColorOpen(false); }} title="형광펜">
                        <Highlighter className="w-4 h-4" />
                    </ToolButton>
                    {highlightOpen && (
                        <div className="absolute z-30 mt-1 left-0 p-2 rounded-lg bg-[#0d1230] border border-white/15 shadow-xl grid grid-cols-4 gap-1.5">
                            {HIGHLIGHT_COLORS.map((c) => (
                                <button
                                    key={c}
                                    type="button"
                                    onClick={() => setHighlight(c)}
                                    title={c === 'transparent' ? '제거' : c}
                                    className="w-6 h-6 rounded border border-white/20 hover:scale-110 transition-transform"
                                    style={{
                                        backgroundColor: c === 'transparent' ? 'transparent' : c,
                                        backgroundImage: c === 'transparent' ? 'linear-gradient(45deg, #444 25%, transparent 25%), linear-gradient(-45deg, #444 25%, transparent 25%)' : 'none',
                                        backgroundSize: '6px 6px',
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <Divider />

                <ToolButton onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })} title="왼쪽 정렬"><AlignLeft className="w-4 h-4" /></ToolButton>
                <ToolButton onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })} title="가운데 정렬"><AlignCenter className="w-4 h-4" /></ToolButton>
                <ToolButton onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })} title="오른쪽 정렬"><AlignRight className="w-4 h-4" /></ToolButton>
                <ToolButton onClick={() => editor.chain().focus().setTextAlign('justify').run()} active={editor.isActive({ textAlign: 'justify' })} title="양쪽 정렬"><AlignJustify className="w-4 h-4" /></ToolButton>

                <Divider />

                <ToolButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="글머리 기호"><List className="w-4 h-4" /></ToolButton>
                <ToolButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="번호 매기기"><ListOrdered className="w-4 h-4" /></ToolButton>
                <ToolButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="인용"><Quote className="w-4 h-4" /></ToolButton>
                <ToolButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')} title="코드 블록"><SquareCode className="w-4 h-4" /></ToolButton>
                <ToolButton onClick={() => editor.chain().focus().setHorizontalRule().run()} title="구분선"><Minus className="w-4 h-4" /></ToolButton>

                <Divider />

                <ToolButton onClick={onLink} active={editor.isActive('link')} title="링크 (Ctrl+K)"><LinkIcon className="w-4 h-4" /></ToolButton>
                <ToolButton onClick={onImage} disabled={uploading} title="이미지 첨부 (드래그·붙여넣기 지원)">
                    {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
                </ToolButton>
                <ToolButton onClick={onYoutube} title="YouTube 임베드"><YoutubeIcon className="w-4 h-4" /></ToolButton>
                <ToolButton onClick={insertTable} title="표 삽입 (3×3)"><TableIcon className="w-4 h-4" /></ToolButton>
            </div>
        </div>
    );
}
