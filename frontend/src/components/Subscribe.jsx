const Subscribe = () => {
  return (
    <>
      <div className="text-center py-16 mb-16">
        <h1 className="text-2xl font-bold pt-3">Subscribe now & get 20% off</h1>
        <h1 className="text-base text-gray-400 pt-3 pb-4">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </h1>
        <form>
          <input
            required
            className="py-2 px-4 w-[20rem] border border-gray-400 outline-none"
            type="email"
            id=""
            placeholder="Enter your email"
          />
          <button className="text-white bg-black px-16 font-bold py-3 text-sm mt-4 hover:opacity-80 transition-all">
            SUBSCRIBE
          </button>
        </form>
      </div>
    </>
  );
};

export default Subscribe;
