# Use the official Python image from the Docker Hub, version > 3.8
FROM python:3.9-slim

# Set the working directory in the container to /app
WORKDIR /app

# Copy the requirements.txt file to the working directory
COPY requirements.txt .

# Install the required Python packages
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container
COPY . .

# Expose the port that the Flask app will run on (default 5000)
EXPOSE 5000

# Set the environment variable for Flask
ENV FLASK_APP=ENV FLASK_APP=main.py


# Set the environment to production
ENV FLASK_ENV=production

# Run the Flask app
CMD ["flask", "run", "--host=0.0.0.0"]
