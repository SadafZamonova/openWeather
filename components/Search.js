const Search = () => {

return (
  <div>
  <div className="  h-full px-4 pt-5  w-full pb-5 bg-searchbg flex justify-center" >
    <div className="  h-full px-4 pt-5  pb-5  w-900 flex justify-center">
    <div className=" h-full w-full ">
      <div className="input-group relative flex items-stretch w-full ">
        <input
          type="search"
          className="form-control relative flex-auto w-full min-w-0 block  px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Search city"
          aria-label="Search"
          aria-describedby="button-addon2"
          // onChange={filterInfoChange}
        />
        <button className="bg-black text-searchbg rounded-r-md w-20">Search</button>
      </div>  
    </div>
    <div className="flex flex-row justify-end">
    <div className=" flex items-center justify-center cursor-pointer ml-24 p-2 bg-#ececed">
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m3 11l19-9l-9 19l-2-8l-8-2z"/></svg>
      </div>
    <span className="text-xs bg-#ececed w-40 pt-2 mr-4 ml-4">Different Weather?</span>
    <div className="flex flex-row bg-#ececed relative">
        <div id="selected" className="absolute bg-white "></div>
        <div className="text-xs flex-1 items-center justify-center  z-10 cursor-pointer pt-2">
            Metric: °C, m/s
        </div>
        <div className="text-xs flex-1 items-center justify-center w-36 pt-2 z-10 cursor-pointer">
            Imperial: °F, mph
        </div>
    </div>
  </div>
  </div> 
  </div>
  </div>
)
}

export default Search;