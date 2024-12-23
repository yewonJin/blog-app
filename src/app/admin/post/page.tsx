import { createPostAction } from '@/entities/post/utils/actions';
import EditorForm from '@/components/EditorForm';

export default function Page() {
  return <EditorForm action={createPostAction} />;
}
