import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center px-6">
        <h1 className="mb-3 text-hero font-bold">404</h1>
        <p className="mb-6 text-[15px] text-muted-foreground">Página não encontrada</p>
        <Link to="/" className="text-primary text-[14px] font-semibold underline underline-offset-4 hover:text-primary/80 transition-colors py-2 inline-block">
          Voltar ao início
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
