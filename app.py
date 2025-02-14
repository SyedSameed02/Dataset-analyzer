from flask import Flask, request, jsonify
import pandas as pd
from sklearn.preprocessing import StandardScaler, MinMaxScaler
from sklearn.impute import SimpleImputer
import matplotlib.pyplot as plt
import io
import base64
from flask_cors import CORS


app = Flask(__name__)

CORS(app)

@app.route('/analyze', methods=['POST'])
def analyze_dataset():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded."}), 400

    file = request.files['file']
    try:
        df = pd.read_csv(file)
        info = {
            "columns": list(df.columns),
            "shape": df.shape,
            "missing_values": df.isnull().sum().to_dict(),
            "summary": df.describe().to_dict(),
        }
        return jsonify(info)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/visualize', methods=['POST'])
def visualize_dataset():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded."}), 400

    file = request.files['file']
    data = request.get_json()
    columns = data.get("columns", [])

    try:
        df = pd.read_csv(file)
        if not columns:
            return jsonify({"error": "No columns specified for visualization."}), 400

        # Generate plots for the specified columns
        plots = {}
        for column in columns:
            if column in df.columns:
                fig, ax = plt.subplots()
                if pd.api.types.is_numeric_dtype(df[column]):
                    df[column].hist(ax=ax)
                    ax.set_title(f"Histogram of {column}")
                else:
                    df[column].value_counts().plot(kind='bar', ax=ax)
                    ax.set_title(f"Bar Plot of {column}")
                buf = io.BytesIO()
                plt.savefig(buf, format='png')
                buf.seek(0)
                image_base64 = base64.b64encode(buf.getvalue()).decode('utf-8')
                buf.close()
                plots[column] = image_base64
                plt.close(fig)
            else:
                plots[column] = "Column not found in dataset."

        return jsonify(plots)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/preprocess', methods=['POST'])
def preprocess_dataset():
    data = request.get_json()
    if not data or 'techniques' not in data or 'file' not in request.files:
        return jsonify({"error": "Invalid request."}), 400

    file = request.files['file']
    techniques = data['techniques']

    try:
        df = pd.read_csv(file)

        if "Normalization" in techniques:
            scaler = MinMaxScaler()
            df[df.columns] = scaler.fit_transform(df[df.columns])

        if "Missing Value Imputation" in techniques:
            imputer = SimpleImputer(strategy='mean')
            df[df.columns] = imputer.fit_transform(df[df.columns])

        if "Outlier Detection" in techniques:
            # Example: Cap values at 3 standard deviations from the mean
            df = df.clip(lower=df.mean() - 3 * df.std(), upper=df.mean() + 3 * df.std())

        # Add more preprocessing as needed

        return df.to_json(orient='split')
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
