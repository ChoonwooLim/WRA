'use client';

import { Image as TiptapImage } from '@tiptap/extension-image';
import {
    ReactNodeViewRenderer,
    NodeViewWrapper,
    NodeViewProps,
} from '@tiptap/react';
import { useRef, useState, PointerEvent as ReactPointerEvent } from 'react';
import { AlignCenter, AlignLeft, AlignRight, Trash2 } from 'lucide-react';

function ResizableImageView(props: NodeViewProps) {
    const { node, updateAttributes, selected, deleteNode, editor } = props;
    const { src, alt, width, align } = node.attrs as {
        src: string;
        alt?: string | null;
        width?: string | null;
        align?: 'left' | 'center' | 'right' | null;
    };

    const containerRef = useRef<HTMLDivElement>(null);
    const [resizing, setResizing] = useState(false);

    const setWidthPreset = (val: string | null) => updateAttributes({ width: val });
    const setAlign = (val: 'left' | 'center' | 'right') => updateAttributes({ align: val });

    const startResize = (
        e: ReactPointerEvent<HTMLDivElement>,
        direction: 'left' | 'right'
    ) => {
        e.preventDefault();
        e.stopPropagation();
        if (!containerRef.current) return;

        const startX = e.clientX;
        const startWidth = containerRef.current.offsetWidth;
        const parentWidth = containerRef.current.parentElement?.offsetWidth || startWidth;
        setResizing(true);
        (e.target as HTMLElement).setPointerCapture(e.pointerId);

        const onMove = (ev: PointerEvent) => {
            const dx = ev.clientX - startX;
            const next = direction === 'right' ? startWidth + dx : startWidth - dx;
            const clamped = Math.max(80, Math.min(parentWidth, next));
            updateAttributes({ width: `${Math.round(clamped)}px` });
        };
        const onUp = () => {
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerup', onUp);
            setResizing(false);
        };
        window.addEventListener('pointermove', onMove);
        window.addEventListener('pointerup', onUp);
    };

    const isInteractive = editor.isEditable;
    const showOverlay = isInteractive && (selected || resizing);

    const wrapStyle: React.CSSProperties = {
        textAlign: (align || 'center') as React.CSSProperties['textAlign'],
    };
    const containerStyle: React.CSSProperties = {
        width: width || 'auto',
        maxWidth: '100%',
        display: 'inline-block',
        position: 'relative',
        verticalAlign: 'middle',
    };

    return (
        <NodeViewWrapper as="div" className="rich-img-wrap" style={wrapStyle}>
            <div
                ref={containerRef}
                className={`rich-img-container ${showOverlay ? 'is-selected' : ''}`}
                style={containerStyle}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={alt || ''} className="rich-image" draggable={false} />

                {showOverlay && (
                    <>
                        <div
                            className="rich-img-handle rich-img-handle-l"
                            onPointerDown={(e) => startResize(e, 'left')}
                        />
                        <div
                            className="rich-img-handle rich-img-handle-r"
                            onPointerDown={(e) => startResize(e, 'right')}
                        />
                        <div className="rich-img-handle rich-img-handle-tl" onPointerDown={(e) => startResize(e, 'left')} />
                        <div className="rich-img-handle rich-img-handle-tr" onPointerDown={(e) => startResize(e, 'right')} />
                        <div className="rich-img-handle rich-img-handle-bl" onPointerDown={(e) => startResize(e, 'left')} />
                        <div className="rich-img-handle rich-img-handle-br" onPointerDown={(e) => startResize(e, 'right')} />

                        <div
                            className="rich-img-toolbar"
                            contentEditable={false}
                            onMouseDown={(e) => e.preventDefault()}
                        >
                            <button type="button" title="25%" onClick={() => setWidthPreset('25%')}>25%</button>
                            <button type="button" title="50%" onClick={() => setWidthPreset('50%')}>50%</button>
                            <button type="button" title="75%" onClick={() => setWidthPreset('75%')}>75%</button>
                            <button type="button" title="100%" onClick={() => setWidthPreset('100%')}>100%</button>
                            <button type="button" title="원본 크기" onClick={() => setWidthPreset(null)}>원본</button>
                            <span className="rich-img-toolbar-sep" />
                            <button
                                type="button"
                                title="왼쪽 정렬"
                                className={align === 'left' ? 'is-active' : ''}
                                onClick={() => setAlign('left')}
                            >
                                <AlignLeft className="w-3.5 h-3.5" />
                            </button>
                            <button
                                type="button"
                                title="가운데 정렬"
                                className={!align || align === 'center' ? 'is-active' : ''}
                                onClick={() => setAlign('center')}
                            >
                                <AlignCenter className="w-3.5 h-3.5" />
                            </button>
                            <button
                                type="button"
                                title="오른쪽 정렬"
                                className={align === 'right' ? 'is-active' : ''}
                                onClick={() => setAlign('right')}
                            >
                                <AlignRight className="w-3.5 h-3.5" />
                            </button>
                            <span className="rich-img-toolbar-sep" />
                            <button
                                type="button"
                                title="이미지 삭제"
                                className="rich-img-toolbar-danger"
                                onClick={() => deleteNode()}
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </>
                )}
            </div>
        </NodeViewWrapper>
    );
}

export const ResizableImage = TiptapImage.extend({
    name: 'image',
    draggable: true,
    selectable: true,

    addAttributes() {
        return {
            ...this.parent?.(),
            width: {
                default: null,
                parseHTML: (el) => {
                    const w =
                        (el as HTMLElement).style?.width ||
                        el.getAttribute('width') ||
                        null;
                    return w || null;
                },
                renderHTML: (attrs: { width?: string | null }) => {
                    if (!attrs.width) return {};
                    return {
                        width: attrs.width,
                        style: `width: ${attrs.width};`,
                    };
                },
            },
            align: {
                default: null,
                parseHTML: (el) => {
                    const parent = el.parentElement;
                    const ta = parent?.style?.textAlign;
                    if (ta === 'left' || ta === 'right' || ta === 'center') return ta;
                    return null;
                },
                renderHTML: () => ({}),
            },
        };
    },

    renderHTML({ HTMLAttributes, node }) {
        const align = (node.attrs.align as string) || 'center';
        const width = node.attrs.width as string | null;
        const imgStyle = width ? `width: ${width}; max-width: 100%; height: auto;` : 'max-width: 100%; height: auto;';
        return [
            'div',
            { style: `text-align: ${align}; margin: 0.75rem 0;` },
            ['img', { ...HTMLAttributes, style: imgStyle, class: 'rich-image' }],
        ];
    },

    addNodeView() {
        return ReactNodeViewRenderer(ResizableImageView);
    },
});
