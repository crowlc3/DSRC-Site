FROM python:3.9
WORKDIR /app

COPY api/requirements.txt api/api.py api/.flaskenv ./
RUN pip install -r ./requirements.txt
ENV FLASK_ENV development

EXPOSE 5000
CMD ["python3", "-m", "flask", "api.py"]