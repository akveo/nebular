deploy_docs() {
  if [[ "$TRAVIS_PULL_REQUEST" = "false" ]]; then
    npm run docs:gh-pages &

    # https://github.com/travis-ci/travis-ci/issues/4190#issuecomment-169987525
    minutes=0
    limit=30
    while kill -0 $! >/dev/null 2>&1; do
      echo -n -e " \b"

      if [ $minutes == $limit ]; then
        break;
      fi

      minutes=$((minutes+1))

      sleep 60
    done
  fi
}
