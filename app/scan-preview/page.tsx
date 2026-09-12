import type { Metadata } from 'next';
import ScanPreviewApp from '@/components/scan/ScanPreviewApp';

export const metadata: Metadata = {
  title: 'Scan preview — KnowYourRemedy',
  description: 'Mobile-first post-scan product screen preview using unverified draft rows.',
};

export default async function ScanPreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const raw = params.id;
  const initialId = typeof raw === 'string' ? raw : Array.isArray(raw) ? raw[0] : undefined;

  return <ScanPreviewApp initialId={initialId} />;
}
