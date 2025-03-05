const Header = function () {
  return (
    <>
    <div className="mx-2">
      <header className="w-full max-w-4xl mt-2 mx-auto p-8 sm:p-6 md:p-12 shadow-lg text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-8">
          Discover Delicious Recipes
        </h1>
        <p className=" text-lg sm:text-base md:text-lg">
          This Edamam recipe API has the data of thousands of foods, including international dishes.
          Enter <b>ANY</b>  sort of  food (e.g pasta, chicken enchilada, dumpling, etc.) to see its magic. <span className="inline-block w-3 h-3 bg-[#FEFAE0] rounded-full animate-grow"></span>

        </p>

      </header>
      </div>
    </>
  );
};

export default Header;