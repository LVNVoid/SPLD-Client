const Unauthorized = () => {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <h1 className="text-2xl font-bold"> 403 Unauthorized</h1>
      <p className="text-muted-foreground">
        You are not authorized to access this page.
      </p>
    </div>
  );
};

export default Unauthorized;
