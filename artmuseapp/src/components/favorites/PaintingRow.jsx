import React from 'react'
import { set_wallpaper_from_favorite } from '../../state/manager'

const PaintingRow = ({ painting, index, unfavorite }) => {
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
                <div className="flex flex-col mt-5 space-y-2 pb-3  ">
                    <div className="basis-1/3 ">
                        <a className="btn btn-outline btn-xs text-xs" href={painting["resourceLink"]} target="_blank">
                            Details
                        </a>
                    </div>
                    <div className="basis-1/3 ">
                        <div className="ml-auto  btn btn-xs btn-outline" onClick={() => set_wallpaper_from_favorite(painting["id"])}>
                            Set as Wallpaper
                        </div>

                    </div>
                    <div>
                        <div className="basis-1/3 ml-auto  btn btn-xs btn-outline" onClick={() => unfavorite(painting["id"])}>
                            Remove from favorites
                        </div>
                    </div>
                    
                </div>


            </div>
        </div>

    </div>

}
export default PaintingRow