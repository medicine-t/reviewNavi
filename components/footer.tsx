export default function Footer() {
  return (
    <footer className="bg-background border-t py-4 mt-8">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm text-muted-foreground">
          {new Date().getFullYear()} Search Gourmet. Powered by{" "}
          <a href="http://webservice.recruit.co.jp/">
            ホットペッパーグルメ Webサービス
          </a>
        </p>
      </div>
    </footer>
  );
}
