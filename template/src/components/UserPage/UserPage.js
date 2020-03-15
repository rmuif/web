import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import { Grid } from "@material-ui/core";

import { firestore } from "../../firebase";

import EmptyState from "../EmptyState";

import Loader from "../Loader";
import UserCard from "../UserCard";

import { ReactComponent as ErrorIllustration } from "../../illustrations/error.svg";
import { ReactComponent as NoDataIllustration } from "../../illustrations/no-data.svg";

const useStyles = makeStyles({
  grid: {
    margin: 0,
    width: "100%"
  }
});

function UserPage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const { userId } = useParams();
  const classes = useStyles();

  useEffect(() => {
    return firestore
      .collection("users")
      .doc(userId)
      .onSnapshot(
        snapshot => {
          setLoading(false);
          setUser(snapshot.data());
        },
        error => {
          setLoading(false);
          setError(error);
        }
      );
  }, [userId]);

  if (!error) {
    return (
      <EmptyState
        image={<ErrorIllustration />}
        title="Something went wrong"
        description="An error occured when retrieving the user"
      />
    );
  }

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return (
      <EmptyState
        image={<NoDataIllustration />}
        title="User not found"
        description="The user doesn’t exist"
      />
    );
  }

  return (
    <Grid className={classes.grid} container justify="center" spacing={5}>
      <Grid item xs={6}>
        <UserCard user={user} />
      </Grid>
    </Grid>
  );
}

export default UserPage;
