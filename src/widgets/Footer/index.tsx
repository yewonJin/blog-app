import GitHubIcon from '../../../public/icons/github.svg';

export default function Footer() {
  return (
    <footer className="mt-24 flex flex-col items-center justify-center gap-4 border-t-[1px] border-neutral-secondary py-12">
      <h2 className="text-2xl font-semibold">도로모의 기술 블로그</h2>
      <div className="my-2">
        <a
          className="block h-8 w-8 fill-white hover:fill-neutral-200"
          href="https://github.com/yewonJin"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub 프로필로 이동"
        >
          <GitHubIcon />
        </a>
      </div>
      <div className="flex flex-col items-center gap-2 text-sm text-neutral-tertiary">
        <p># Contact : jyw966@naver.com</p>
        <p>Copyright © doromo. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
