<nav className="flex flex-col md:flex-row items-center justify-between p-4 gap-4">
  <h1 className="text-xl font-bold">
    Cocktails
  </h1>

  <div className="w-full md:w-auto flex-1 md:max-w-md">
    <Search/>
  </div>

  <div className="flex items-center gap-2">
    <span>
      Favorites
    </span>
    <FavoriteList/>
  </div>
</nav>