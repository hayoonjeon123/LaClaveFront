import "@blocknote/core/fonts/inter.css";
import { ko } from "@blocknote/core/locales";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";

function AppEditor() {
  const locale = ko;
  // Creates a new editor instance.
  const editor = useCreateBlockNote({
    dictionary: {
      ...locale,
      placeholders: {
        ...locale.placeholders,
        emptyDocument: "텍스트를 입력하거나 '/'를 눌러 명령어를 실행하세요.",
      },
    },
  });

  // Renders the editor instance using a React component.
  return (
    <BlockNoteView
      editor={editor}
      shadCNComponents={
        {
          // Pass modified ShadCN components from your project here.
          // Otherwise, the default ShadCN components will be used.
        }
      }
    />
  );
}
export { AppEditor };
