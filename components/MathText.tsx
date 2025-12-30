"use client";

import { useMemo } from 'react';
import 'katex/dist/katex.min.css';
import katex from 'katex';

interface MathTextProps {
  text: string;
  className?: string;
}

export default function MathText({ text, className = '' }: MathTextProps) {
  const renderedContent = useMemo(() => {
    if (!text) return null;

    // Pattern to match LaTeX expressions:
    // \( ... \) for inline math
    // \[ ... \] for display math
    // $$ ... $$ for display math (double dollar) - but NOT currency
    // Note: We do NOT match single $ ... $ because it conflicts with currency like $2,000
    const latexPattern = /\\\(([\s\S]*?)\\\)|\\\[([\s\S]*?)\\\]|\$\$([^\$]+?)\$\$/g;

    const parts: { type: 'text' | 'math'; content: string; displayMode: boolean }[] = [];
    let lastIndex = 0;
    let match;

    while ((match = latexPattern.exec(text)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: text.slice(lastIndex, match.index),
          displayMode: false
        });
      }

      // Determine which group matched and if it's display mode
      let mathContent = '';
      let displayMode = false;

      if (match[1] !== undefined) {
        // \( ... \) - inline
        mathContent = match[1];
        displayMode = false;
      } else if (match[2] !== undefined) {
        // \[ ... \] - display
        mathContent = match[2];
        displayMode = true;
      } else if (match[3] !== undefined) {
        // $$ ... $$ - display
        mathContent = match[3];
        displayMode = true;
      }

      parts.push({
        type: 'math',
        content: mathContent,
        displayMode
      });

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push({
        type: 'text',
        content: text.slice(lastIndex),
        displayMode: false
      });
    }

    // If no LaTeX found, return null to just render the original text
    if (parts.length === 1 && parts[0].type === 'text') {
      return null;
    }

    return parts;
  }, [text]);

  if (!text) return null;

  // If no LaTeX patterns found, just return the text as-is
  if (!renderedContent) {
    return <span className={className}>{text}</span>;
  }

  // Build HTML string with proper spacing
  const htmlParts = renderedContent.map((part) => {
    if (part.type === 'text') {
      // Escape HTML and preserve ALL spaces by replacing them with &nbsp; for multiple spaces
      // but keep single spaces as regular spaces (they render fine in HTML)
      return part.content
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/  +/g, (match) => '&nbsp;'.repeat(match.length)); // preserve multiple spaces
    } else {
      try {
        // Replace spaces inside \text{} with ~ (non-breaking space in LaTeX)
        // This ensures spaces are preserved in text mode
        const processedContent = part.content.replace(
          /\\text\{([^}]*)\}/g,
          (match, innerText) => `\\text{${innerText.replace(/ /g, '~')}}`
        );

        return katex.renderToString(processedContent, {
          throwOnError: false,
          displayMode: part.displayMode,
          trust: true,
        });
      } catch {
        return part.content;
      }
    }
  });

  return (
    <span
      className={className}
      style={{ whiteSpace: 'pre-wrap', wordSpacing: 'normal' }}
      dangerouslySetInnerHTML={{ __html: htmlParts.join('') }}
    />
  );
}
