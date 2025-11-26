FROM python:3.11-slim
WORKDIR /attacker
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY attack.py .
CMD ["python", "attack.py"]
