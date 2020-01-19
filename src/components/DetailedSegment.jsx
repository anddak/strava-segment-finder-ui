import React from 'react';
import L from "leaflet";
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import TrendingUpOutlinedIcon from '@material-ui/icons/TrendingUpOutlined';
import FilterHdrIcon from '@material-ui/icons/FilterHdr';
import {Typography} from '@material-ui/core';
import {Card} from '@material-ui/core';
import {CardHeader} from '@material-ui/core';
import {CardContent} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import moment from 'moment';
import 'leaflet.heightgraph/dist/L.Control.Heightgraph'
import 'leaflet.heightgraph/dist/L.Control.Heightgraph.min.css';
import AthletePerformance from "./cards/AthletePerformance";
import SegmentProfile from "./cards/SegmentProfile";

export default function DetailedSegment({hideDetail, segmentDetails}) {

  return (
    <div>
      <IconButton>
        <ArrowBackIosIcon size={'large'} onClick={hideDetail}>
        </ArrowBackIosIcon>
      </IconButton>
      <div>
        <Typography variant="h4">{segmentDetails ? segmentDetails.name : null}</Typography>
        <p>{segmentDetails ? segmentDetails.athlete_count : null} runners completed.</p>
        <p>{segmentDetails ? segmentDetails.effort_count : null } times completed.</p>
      </div>
      <SegmentProfile
        segmentDetails={segmentDetails ? segmentDetails : false}/>
      <AthletePerformance
        athleteSegmentStats={segmentDetails ? segmentDetails.athlete_segment_stats : false}/>
    </div>
  )
}

