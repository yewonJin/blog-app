import { createPostAction } from '@/entities/post';
import { EditorForm } from '@/widgets/EditorForm';

export default function Page() {
  return <EditorForm action={createPostAction} />;
}
