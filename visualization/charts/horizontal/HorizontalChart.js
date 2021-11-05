import PropTypes from 'prop-types'
import {useRef} from "react";
import Content from "./templates/Content";
import {BarChartRounded} from "@material-ui/icons";
import Wrapper from "../shared/Wrapper";


export default function HorizontalChart(props) {
    const scrollableRef = useRef()
    const graphRef = useRef()

    return (
        <div>
            {props.value === undefined || props.axis === undefined || !props.value.field || !props.axis.field ?
                <BarChartRounded
                    style={{
                        transform: 'translate(-50%, -50%) rotate(90deg)',
                        top: '50%',
                        left: '50%',
                        fontSize: (props.height > props.width ? (props.height) / 2 : props.width / 2) + 'px',
                        color: props.color ? props.color : '#0095ff',
                        position: "absolute"
                    }}
                />
                :
                <Wrapper title={props.title} setTitle={props.setTitle} value={props.value?.field} data={props.data}>
                    {(offset, iterations, biggest) => (
                        <>
                            <svg
                                width={'100%'}
                                overflow={'visible'}
                                // height={0}
                                style={{position: 'absolute', zIndex: 0, left: (props.width * .07 + 2) + 'px'}}
                            >
                                {iterations.map((i, index) => (
                                    <g style={{stroke: '#999999', strokeWidth: '.5'}}
                                       key={index + '-line-iterations-' + i.value}>
                                        <line x1={i.x + '%'} x2={i.x + '%'} y1={0} y2={props.height - offset * 2}
                                        />
                                    </g>
                                ))}
                            </svg>
                            <div style={{overflowY: 'auto', height: (props.height - offset * 2) + 'px', width: '100%'}}
                                 >
                                <svg
                                    ref={scrollableRef}
                                    width={props.width - props.width * 0.7 - 20}
                                    overflow={'visible'}
                                    style={{position: 'relative', zIndex: 10}}
                                    // height={(props.data.length - 1) * 30}
                                >
                                    <Content
                                        {...props}
                                        scrollableRef={scrollableRef.current}
                                        data={props.data}
                                        biggest={biggest}
                                    />
                                </svg>
                            </div>
                            <div
                                ref={graphRef}
                                style={{
                                    width: '100%',
                                    paddingLeft: (props.width * .07 + 1) + 'px',
                                    marginLeft: 'auto',
                                    borderTop: '#e0e0e0 1px solid',
                                    height: offset + 'px'
                                }}>
                                <svg
                                    width={props.width}
                                    height={'100%'}
                                    overflow={'visible'}
                                >
                                    {iterations.map((i, index) => (
                                        <g style={{fill: '#555555', strokeWidth: '1', fontSize: '10px'}}>
                                            <text x={i.x + '%'} y={offset - 10}
                                                  textAnchor={'middle'}>
                                                {i.value}
                                            </text>
                                        </g>
                                    ))}
                                </svg>
                            </div>
                        </>
                    )}
                </Wrapper>
            }
        </div>
    )
}
HorizontalChart.propTypes = {
    value: PropTypes.shape({
        label: PropTypes.string,
        field: PropTypes.string
    }),
    axis: PropTypes.shape({
        label: PropTypes.string,
        field: PropTypes.string
    }),

    data: PropTypes.arrayOf(PropTypes.object),
    width: PropTypes.number,
    height: PropTypes.number,
    title: PropTypes.string,
    legends: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        field: PropTypes.string
    })),

    color: PropTypes.string
}
