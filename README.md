This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started (Groep 5)

#### HOW TO EDIT THE FRONTEND PAGE
You need:
Visual Studio 2022 (Or any version of Visual Studio)

Steps:
- Install [Next.js](https://nodejs.org/en)
IMPORTANT: During installation, you must make sure "Automatically install the necessary tools." is checked. ☑️
- Once everything is done (CMD en Powershell commands): Go to the [B2D_FrontEnd repository](https://github.com/ZuydUniversity/B2C6_B2D_Frontend/tree/groep_5_b2d?tab=readme-ov-file)
- Press the green "Code" button > Open with Visual Studio
- Copy the `.gitignore` file from the [Source Repository](https://github.com/ZuydUniversity/B2C6_B2D_Frontend) and paste the contents within the `.gitignore` file within your code workspace in Visual Studio.
- Commit this change by pressing Git > Commit or Stash in the top left of Visual Studio.
- Try to Push the change to this branch. It's possible an error regarding `FileContentIndex` is raised. To fix this, right click this folder under the Commit tab on the right, and click "Ignore these local files". Thenn try again. Once no errors are raised, click Fetch, then Pull. Now your code is synced.
- Right click the main folder in the Visual Studio project (B2C6_B2D_Frontend), and click "Open in Terminal"
- type "npm install" and press enter, wait till everything is installed.
- type "npm run dev" and press enter, this should start running the server locally.
- Wait for a bit, then open this [link](http://localhost:3000), you should now see the page!

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

#### Screenshots

![Account Pagina](https://i.imgur.com/C4H5EIg.png)


#### Extra info

- This project uses a MariaDB database.
- This project is run on [Azure](http://52.166.126.230/login). Click Azure to go to the site.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deployed on Azure

This project is deployed on an Azure VM, with the ip `51.144.74.229`

