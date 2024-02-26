function RecipeCard({ name, imageUrl }) {
  return (
    <div className="w-80">
      <div className="flex flex-auto h-60 w-[100%] justify-center border-[1px] border-black items-center mx-2 my-1 overflow-hidden cursor-pointer">
        <div
          className="w-full h-full grid place-items-center hover:-translate-y-1 hover:scale-110 duration-[2000ms]"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
          }}
        >
          <div className="border-[1px] border-black px-3 py-2 flex flex-col items-center mx-auto w-3/6 bg-neutral-100 opacity-50">
            <h2 className="text-lg font-semibold">{name}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
