import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import moment from 'moment';

export default function DetailedSegment({hideDetail, segmentDetails}) {

  return (
    <div>
      <IconButton>
        <ArrowBackIosIcon size={'large'} onClick={hideDetail}>
        </ArrowBackIosIcon>
      </IconButton>

      {segmentDetails ?
        (
          <div>
            <p>{segmentDetails.name}</p>
            <p>{segmentDetails.distance} m</p>
            <p>{segmentDetails.average_grade} %</p>
            <p>{segmentDetails.athlete_count} runners completed.</p>
            <p>{segmentDetails.effort_count} times completed.</p>
            <p>Lowest elevation: {segmentDetails.elevation_low}</p>
            <p>Highest elevation: {segmentDetails.elevation_high}</p>
            <p>{segmentDetails.total_elevation_gain} elevation gain.</p>
          </div>) : null}

      {segmentDetails && segmentDetails.athlete_segment_stats ?

        (
          <div>
            <p>Your
              time: {segmentDetails.athlete_segment_stats.pr_elapsed_time ?
                moment()
                  .startOf('day')
                  .seconds(segmentDetails.athlete_segment_stats.pr_elapsed_time)
                  .format('H:mm:ss') : 'not attempted.'} </p>
            <p>{segmentDetails.athlete_segment_stats.average_pace ?
              moment()
                .startOf('day')
                .seconds(segmentDetails.athlete_segment_stats.average_pace)
                .format('mm:ss') + ' min/km' : 'not attempted.'} </p>
            <p>You've
              had {segmentDetails.athlete_segment_stats.effort_count ? segmentDetails.athlete_segment_stats.effort_count : 0} attempts.</p>
          </div>) : null}
      //render polyline on graph
    </div>
  )
}