import React, { useState, useEffect } from "react";
import { withRouter } from '../map/withRouter';

function ZoneTimeseries(props) {
    const [bins, setBins] = useState([]);
    const [colors, setColors] = useState([]);
    const [stats, setStats] = useState([]);

    useEffect(() => {
        if(props.statistics && props.statistics.histogram && props.statistics.histogram.bins) {
            setBins(props.statistics.histogram.bins)
            setColors(props.statistics.colors)
            setStats(props.statistics.stats)
        }
    }, [props]);

    useEffect(() => {
        if (props.statistics.histogram && props.statistics.histogram.bins && props.statistics.histogram.bins !== bins) {
            setBins(props.statistics.histogram.bins)
        }
        if (props.statistics.colors && props.statistics.colors !== colors) {
            setColors(props.statistics.colors)
        }
        if (props.statistics.stats && props.statistics.stats !== stats) {
            setStats(props.statistics.stats)
        }
    }, [props.statistics]);

    return (
        <div className="observation">
            {bins.map((bin, i) => (
                <span className="threshold" style={{backgroundColor: bin.color}}>
                    {bin.lowEdge.toFixed(2)} - { (bin.count / (stats.sampleCount - stats.noDataCount) * 100).toFixed(2)}%
                </span>
            ))}
        </div>
    );
}

export default withRouter(ZoneTimeseries);
