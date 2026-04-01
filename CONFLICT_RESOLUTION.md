# Conflict Resolution Notes

This branch includes conflict-free versions of the files that were previously flagged in GitHub PR checks:

- `src/api/client.js`
- `src/api/jobsApi.js`
- `src/pages/HomePage.jsx`
- `src/pages/JobsPage.jsx`
- `src/routes/AppRoutes.jsx`
- `src/utils/helpers.js`

## Validation done

- Confirmed there are no merge markers (`<<<<<<<`, `=======`, `>>>>>>>`) in `src/`.
- Confirmed working tree is clean after commit.

If GitHub still shows conflict state, update the PR branch by rebasing/merging the latest target branch head and push again.
