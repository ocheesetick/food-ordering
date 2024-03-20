# Setup
- create src/ and move inside the DIRs: app, components, constants
- `npx expo install expo-crypto` to generate UUID/uinique ids
- `npx expo install expo-image-picker` for image picker
- `npm install dayjs` to display date in a readable way
- link to install Material Top Tab Navigator > https://reactnavigation.org/docs/material-top-tab-navigator/
- Supabase
    - npm install @supabase/supabase-js
    - npm install react-native-elements @react-native-async-storage/async-storage react-native-url-polyfill
    - npx expo install expo-secure-store

# Note
- Inside the src should be app, components, constants
- Have one component per file
- In app.json add in `"experiment"`...`"tsconfigPaths": true`
- In tsconfig.json add `baseUrl` and properties of `paths`

# Supabase
- RLS(Row Level Security) 
    - policies that are created per table for authorizing access
    - by default nobody is allowed to do anything unless one is root user/ admin of the project
    - to create, go to table editor > three dots menu on table hover > view policies
- Run whenever you have new tables `npx supabase gen types typescript --project-id your_project_id > src/database.types.ts`
