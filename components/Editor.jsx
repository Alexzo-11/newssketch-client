'use client';
import { useRef, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

// Import TinyMCE
import tinymce from 'tinymce';

// Import themes and plugins
import 'tinymce/themes/silver/theme';

// Import core plugins (GPL-compatible)
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/media';
import 'tinymce/plugins/table';
import 'tinymce/plugins/help';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/emoticons';

// Import CSS
import 'tinymce/skins/ui/oxide/skin.min.css';
import 'tinymce/skins/ui/oxide/content.min.css';
import 'tinymce/skins/content/default/content.min.css';

export default function Editor({ value, onChange }) {
  const editorRef = useRef(null);
  const containerRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || typeof window === 'undefined') return;

    // Destroy existing editor
    if (editorRef.current) {
      editorRef.current.destroy();
      editorRef.current = null;
    }

    // Initialize TinyMCE
    const init = () => {
      if (containerRef.current) {
        tinymce.init({
          target: containerRef.current,
          // GPL MODE - NO API KEY REQUIRED!
          license_key: 'gpl',
          height: 500,
          menubar: true,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
            'preview', 'anchor', 'searchreplace', 'visualblocks', 'code',
            'fullscreen', 'insertdatetime', 'media', 'table', 'help', 'wordcount',
            'emoticons'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic underline strikethrough | ' +
            'alignleft aligncenter alignright alignjustify | ' +
            'bullist numlist outdent indent | ' +
            'link image media table | removeformat | help',
          skin: isDark ? 'oxide-dark' : 'oxide',
          content_css: isDark ? 'dark' : 'default',
          content_style: `
            body { 
              font-family: 'Open Sans', Helvetica, Arial, sans-serif; 
              font-size: 16px; 
              line-height: 1.8;
              color: ${isDark ? '#e0e0e0' : '#3C4043'};
              background: ${isDark ? '#1a1a1a' : '#FFFFFF'};
              padding: 20px;
            }
            h1, h2, h3, h4 { font-family: 'Montserrat', sans-serif; }
            h1 { font-size: 32px; font-weight: 700; }
            h2 { font-size: 26px; font-weight: 700; }
            h3 { font-size: 22px; font-weight: 600; }
            a { color: #C5232A; }
            blockquote { 
              border-left: 4px solid #C5232A; 
              padding: 16px 24px; 
              margin: 16px 0; 
              background: ${isDark ? '#2d2d2d' : '#f8f9fa'}; 
              border-radius: 4px;
              font-style: italic;
            }
            img { max-width: 100%; height: auto; border-radius: 8px; }
            pre { 
              background: ${isDark ? '#0d0d0d' : '#1a1a1a'}; 
              color: #e0e0e0; 
              padding: 16px; 
              border-radius: 8px; 
              overflow-x: auto; 
            }
            code { 
              background: ${isDark ? '#2d2d2d' : '#f1f3f4'}; 
              padding: 2px 6px; 
              border-radius: 4px; 
            }
            table { border-collapse: collapse; width: 100%; }
            td, th { border: 1px solid #ddd; padding: 8px; }
            th { background-color: ${isDark ? '#2d2d2d' : '#f2f2f2'}; }
          `,
          branding: false,
          promotion: false,
          setup: (editor) => {
            editorRef.current = editor;
            // Set initial content
            if (value) {
              editor.setContent(value);
            }
            // Update parent on change
            editor.on('change', () => {
              const content = editor.getContent();
              onChange(content);
            });
          },
        });
      }
    };

    init();

    // Cleanup
    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [isMounted, isDark, onChange, value]);

  // Update content when value changes externally
  useEffect(() => {
    if (editorRef.current && value !== undefined) {
      const currentContent = editorRef.current.getContent();
      if (currentContent !== value) {
        editorRef.current.setContent(value);
      }
    }
  }, [value]);

  if (!isMounted) {
    return (
      <div className="h-96 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-deepCrimson mx-auto mb-3"></div>
          <p className="text-gray-500 dark:text-gray-400 font-opensans">Loading editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="editor-container">
      <div ref={containerRef} />
    </div>
  );
}
