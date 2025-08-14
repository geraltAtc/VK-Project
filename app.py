from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Симуляция данных (в реальности — из БД VK HR Tek)
benefits = {
    "Coffee voucher": 250,
    "Extra day off": 3000,
    "Gym membership month": 2000,
    "Online course access": 1500
}
user_data = {
    "points": 25000,
    "owned": []
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/points', methods=['GET'])
def get_points():
    return jsonify({"points": user_data["points"], "owned": user_data["owned"]})

@app.route('/api/buy', methods=['POST'])
def buy_benefit():
    data = request.json
    name = data.get('name')
    if name in benefits:
        price = benefits[name]
        if user_data["points"] >= price:
            user_data["points"] -= price
            user_data["owned"].append(name)
            return jsonify({"success": True, "points": user_data["points"], "owned": user_data["owned"]})
        else:
            return jsonify({"success": False, "message": "Not enough points"})
    return jsonify({"success": False, "message": "Invalid benefit"})

if __name__ == '__main__':
    app.run(debug=True)