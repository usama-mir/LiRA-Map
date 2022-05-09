

import { FC, useEffect, useRef, useState } from "react";

import SVGWrapper from "./SVGWrapper";
import Tooltip from "./Tooltip";
import XAxis from "./XAxis";
import YAxis from "./YAxis";

import { useGraph } from "../../context/GraphContext";
import { getXAxis, getYAxis } from "../../assets/graph/axis";
import { Axis, Palette, Plot } from "../../models/graph";
import useSize from "../../hooks/useSize";

import '../../css/graph.css'

interface IGraph {
    labelX: string;
    labelY: string;
    plots?: Plot[]
    palette?: Palette
}

const margin = {top: 20, right: 30, bottom: 50, left: 100};
const paddingRight = 50

const Graph: FC<IGraph> = ( { labelX, labelY, plots, palette }  ) => {

    const wrapperRef = useRef(null)
    const [width, height] = useSize(wrapperRef)

    const [axis, setAxis] = useState<[Axis, Axis]>()
    const [zoom, setZoom] = useState<number>(2)

    const w = width - margin.left - margin.right;
    const h = height - margin.top - margin.bottom;

    const { minX, maxX, minY, maxY } = useGraph()

    useEffect( () => {
        const x = getXAxis(minX, maxX, w * zoom)
        const y = getYAxis(minY, maxY, h)
        setAxis([x, y])
    }, [zoom, minX, maxX, minY, maxY, w, h])

    const zoomIn = () => setZoom( z => z + 1 )
    const zoomOut = () => setZoom( z => Math.max(1, z - 1) )

    return (
        <>
        <Tooltip />
        <div className='graph-wrapper' ref={wrapperRef}>
            <div className="zoom-btns">
                <div className="btn zoom-btn" onClick={zoomIn}>+</div>
                <div className="btn zoom-btn" onClick={zoomOut}>-</div>
            </div>
            <SVGWrapper 
                isLeft={true} zoom={zoom}
                margin={margin} w={w} h={h} width={width} height={height} 
                labelX={labelX} labelY={labelY} axis={axis} Axis={YAxis} palette={palette} 
            />
            <SVGWrapper 
                isLeft={false} zoom={zoom}
                margin={margin} w={w + paddingRight} h={h} width={width} height={height} 
                labelX={labelX} labelY={labelY} axis={axis} Axis={XAxis} palette={palette} 
                plots={plots}
            />
        </div>
        </>
    )
}

export default Graph