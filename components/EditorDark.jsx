'use client';
import { Editor as TinyEditor } from '@tinymce/tinymce-react';
import { useTheme } from 'next-themes';

export default function Editor({ value, onChange }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <TinyEditor
      value={value}
      onEditorChange={onChange}
      init={{
        license_key: 'gpl',
        height: 500,
        menubar: true,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
          'preview', 'anchor', 'searchreplace', 'visualblocks', 'code',
          'fullscreen', 'insertdatetime', 'media', 'table', 'help',
          'wordcount', 'emoticons'
        ],
        toolbar: 'undo redo | blocks | ' +
          'bold italic underline strikethrough | ' +
          'alignleft aligncenter alignright alignjustify | ' +
          'bullist numlist outdent indent | ' +
          'link image media table | removeformat | help',
        // Auto-detect dark mode
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
        `,
        branding: false,
        promotion: false,
      }}
    />
  );
}