const Header = function () {
  return (
    <>
      <header className="w-full max-w-3xl mt-6 mx-auto p-8 sm:p-6 md:p-12 shadow-lg text-center">
        <h1 className="text-4xl sm:text-3xl md:text-5xl font-bold leading-tight mb-8">
          Discover Delicious Recipes
        </h1>
        <p className="text-lg sm:text-base md:text-lg">
          This is an AI recipe search website that gives you recipes based on
          the ingredients that you provide. Get started by writing your
          ingredients and it will give you recipes :)
        </p>
        
      
        <div className="font-extralight inline-block text-black px-2 text-md sm:text-sm md:text-lg mt-2 bg-[#a0b56d] py-2">
          Note : Make sure to add a , between ingredients
        </div>

      </header>
    </>
  );
};

export default Header;
