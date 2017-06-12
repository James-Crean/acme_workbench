
echo "Starting django server on port 8000"
ttab -d ~/projects/acme_workbench/workbench-backend "source activate workbench; python manage.py runserver 0.0.0.0:8000"

echo "Starting frontend build"
ttab -d ~/projects/acme_workbench/workbench-frontend "ng build --watch --output-path ~/projects/acme_workbench/workbench/static/js/ --deploy-url /static/js/"