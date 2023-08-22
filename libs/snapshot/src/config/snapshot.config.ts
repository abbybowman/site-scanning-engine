/**
 * returns the appropriate snapshot filenames for the environment.
 */
export default () => {
  if (process.env.NODE_ENV === 'production') {
    return {
      fileNameLive: 'weekly-snapshot',
      fileNameAll: 'weekly-snapshot-all',
      fileNameExperimental: 'weekly-snapshot-experimental',
    };
  } else {
    return {
      fileNameLive: `weekly-snapshot-${process.env.NODE_ENV}`,
      fileNameAll: `weekly-snapshot-all-${process.env.NODE_ENV}`,
      fileNameExperimental: `weekly-snapshot-experimental-${process.env.NODE_ENV}`,
    };
  }
};
