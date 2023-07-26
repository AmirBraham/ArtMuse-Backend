import { StarIcon } from '@heroicons/react/24/outline'
import { FunctionComponent } from 'react'

interface PaintingDetailsProps{
    artistDisplayName:string;
    objectEndDate:string;
    objectBeginDate:string;
    title:string;
    collection:string;
} 

const PaintingDetails: FunctionComponent<PaintingDetailsProps> = ({ artistDisplayName,
    objectEndDate,
    objectBeginDate,

    title,
    collection }) => {
    return <div>
        <h1>
            {title}
        </h1>
        <h4>
            {artistDisplayName}
        </h4>
        <h4>
            {objectBeginDate + "-"+ objectEndDate}
        </h4>
    </div>
}

export default PaintingDetails