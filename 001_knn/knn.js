function KNN(kSize){
  var that = this;
	this.kSize = kSize;
	this.points = [];
  this._distance = function(arr1, arr2) {
    return arr1.reduce(function(result, ele, i){
      return result += Math.pow((ele - arr2[i]), 2);
    },0);
  };
  this._distances = function(vector, tData) {
    return tData.map(function(tItem) {
      return [that._distance(vector, tItem[0]), tItem[1]];
    });
  };
  this._sorted = function(array) {
    array.sort(function(a, b) {
      return a[0] - b[0];
    });
    return array.map(function(ele) { return ele[1]});
  };
  this._majority = function(kFactor, array) {
    var subArr = array.slice(0, kFactor),
        maxed = 0;
    var tabs = subArr.reduce(function(result, ele) {
      if(ele in result) result[ele]++;
      else result[ele] = 1;
      return result;
    }, {});
    for(var key in tabs) {
      maxed = Math.max(maxed, tabs[key]);
    }
    for(var k in tabs) {
      if(tabs[k] === maxed) {
        return Number(k);
      }
    }
  };
  this.train = function(data) {
    that.points = that.points.concat(data);
  };
  this.predictSingle = function(vector) {
    var distances = that._distances(vector, that.points);
    var sortedDis = that._sorted(distances);
    var result = that._majority(kSize, sortedDis);
    return result;
  };
  this.predict = function(vectorArray) {
    var result = [];
    vectorArray.forEach(function(vector) {
      result.push(that.predictSingle(vector));
    });
    return result;
  };
  this.score = function(testData) {
    var result = 0;
    var sample = testData.map(function(ele) { return ele[0]});
    var actualOutcomes = testData.map(function(ele) { return ele[1]});
    var predictions = that.predict(sample);
    predictions.forEach(function(ele, i) {
      if(ele === actualOutcomes[i]) result += 1;
    });
    return result/predictions.length;
  }
}
module.exports = KNN
