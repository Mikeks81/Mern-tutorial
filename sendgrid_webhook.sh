function localtunnel {
  echo "lt -s jerkoffs --port 5000"
  lt -s jerkoffs --port 5000
}
until localtunnel; do
  echo "localtunnel server crashed"
  sleep 2
done
