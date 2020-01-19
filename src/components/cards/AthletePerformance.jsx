import React from "react";
import moment from "moment";
import {Card, CardContent, Typography} from "@material-ui/core";
import './styles.css';

export default function AthletePerformance({athleteSegmentStats}) {

  const {pr_elapsed_time, average_pace, effort_count} = athleteSegmentStats;

  return(
    <>
      <Card className="segment-profile-card">

      {athleteSegmentStats && pr_elapsed_time ?
        (
          <CardContent>
            <Typography variant="body1">Your
              time: {
                moment()
                  .startOf('day')
                  .seconds(pr_elapsed_time)
                  .format('H:mm:ss')} </Typography>
            <Typography variant="body1"> {
              moment()
                .startOf('day')
                .seconds(average_pace)
                .format('mm:ss') + ' min/km'} </Typography>
            <Typography variant="body1">You've had {effort_count} attempts.</Typography>
          </CardContent>) :
        (<CardContent className="no-attempts-card">
          <Typography
          variant="body1"> You've had no attempts yet :(</Typography>
        </CardContent>)
      }
      </Card>
    </>
  )
}