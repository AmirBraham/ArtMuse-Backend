
const PaintingRow = ({ painting, index,unfavorite }) => {
    return <div className={index % 2 == 0 ? "bg-neutral-200" : ""}>
        <div className="flex flex-row items-center space-x-3 w-screen mb-1">
            <div className="avatar basis-1/4">
                <div className="mask  w-32 h-18">
                    <img src={painting["imageLink"]} />
                </div>
            </div>
            <div className="basis-3/4 flex flex-col">
                <div className="text-sm">
                    {painting["title"]}
                </div>
                <div >
                    {painting["artistDisplayName"]}
                </div>
                <div className="flex flex-row mt-5 ">
                    <div className="basis-1/2 ">
                        <a className="btn btn-outline btn-xs" href={painting["resourceLink"]} target="_blank">
                            Details
                        </a>
                    </div>
                    <div className="basis-1/2 ">
                        <div className="ml-auto  btn btn-xs btn-outline" onClick={() => unfavorite(painting["id"])}>
                            Unfavorite
                        </div>
                    </div>
                </div>


            </div>
        </div>

    </div>

}
export default PaintingRow