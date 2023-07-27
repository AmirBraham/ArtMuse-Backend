import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"
import { openPage } from "../page"
import { Wallpaper } from "../types"


const PaintingRow = ({painting,index}) => {
    return <tr className={index%2 == 0 ?  "bg-neutral-200" : ""}>
       <td></td>
        <td>
            <div className="flex items-center space-x-3">
                <div className="avatar">
                    <div className="mask  w-12 h-12">
                        <img src={painting["imageLink"]}  />
                    </div>
                </div>
                <div>
                    <div className="font-bold">{painting["title"]}</div>
                </div>
            </div>
        </td>
        <td>
            {painting["artistDisplayName"]}
        </td>
        <td>
            <a onClick={() => openPage(painting["resourceLink"])}>
                <ArrowTopRightOnSquareIcon className="w-5 h-5" />
            </a>
        </td>
        <td><p>
            X
            </p></td>

    </tr>
}
export default PaintingRow