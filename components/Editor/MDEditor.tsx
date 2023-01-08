import { useTheme } from '@hooks/useTheme';
import { Box } from '@mui/material';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor, EditorProps } from '@toast-ui/react-editor/';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import { memo } from 'react';

export interface MDEditorProps extends EditorProps {
  forwardedRef?: React.LegacyRef<any>;
}

function MDEditor({ forwardedRef, ...props }: MDEditorProps) {
  const { isDark } = useTheme();

  return (
    <Box
      sx={{
        minHeight: 400,
        flexGrow: 1,
        '& .toastui-editor-defaultUI': {
          border: `1px solid rgba(${
            isDark ? '255, 255, 255, 0.23' : '0, 0, 0, 0.23'
          })`,

          '& .toastui-editor-md-tab-container': isDark
            ? {
                backgroundColor: '#232428',
                borderBottomColor: '#303238',
              }
            : {},
        },
      }}
      className={`editor-panel-editor${isDark ? ' toastui-editor-dark' : ''}`}
    >
      <Editor
        ref={forwardedRef}
        {...props}
        height="60vh"
        initialEditType="markdown"
        hideModeSwitch={true}
        usageStatistics={false}
        toolbarItems={[
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task'],
          ['table', 'link', 'indent', 'outdent'],
          ['code', 'codeblock'],
        ]}
        plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
      />
    </Box>
  );
}

export default memo(MDEditor);
