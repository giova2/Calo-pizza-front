# Pizza-task FronEnd

App to make orders throw an api. You will be able to:

- See the prices in two different currencies.
- Add or remove items from your shopping cart.
- Make the order.
- Consult the order that you just made.

# Deploy

1. Create an account on heroku

2. install heroku CLI globally, here are the instructions for MACOS, Windows and Ubuntu: https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up

3. Execute:
   `$heroku login` from root of our code, and login.

4. Execute:
   `$heroku create NAME_APP`

5. Execute:
   `$git init`

6. We check our remote repository with `git remote -v` (should be a remote with heroku name (repository that was created in step 3.).

7. Execute `$git add .` and `$git commit -m "OUT FIRST COMMIT"` to commit our changes

8. Execute `$git push heroku master` to do our first deployment

9. Everything should work smoothly.
