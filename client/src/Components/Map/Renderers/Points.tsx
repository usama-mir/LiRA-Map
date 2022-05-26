
import { FC } from "react";
import { PointData } from "../../../models/path";
import { RendererProps, PointProps } from "../../../models/renderers";


interface Props extends RendererProps {
    PointElt: FC<PointProps>
}

/*
    Used to render Rectangles and Circles
*/
const Points: FC<Props> = ( { path, properties, onClick, PointElt } ) => {
    const clickEvent = onClick ? onClick : (i: number) => (e: any) => {};
    return (
        <>
        {
            path.map( (point: PointData, i: number) => {
                return <PointElt 
                    key={`PointElt${Math.random()}`}
                    lat={point.lat}
                    lng={point.lng} 
                    pointProperties={point.properties}
                    pathProperties={properties} 
                    onClick={clickEvent}
                    i={i} />
            } )
        }
        </>
    )
}

export default Points;