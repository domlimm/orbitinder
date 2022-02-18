export function scoreUsers(user, prefsObj) {
  //use weighted average
  var userBG = {
    ...user.background,
    gender: user.gender,
    achievement: user.background.achievement
  };
  var {
    pref_techs,
    pref_basics,
    pref_weighted_count,
    pref_basic_count,
    pref_tech_count
  } = prefsObj;
  var basic_score = 0;
  var weighted_score = 0;
  var t_score = 0;
  var user_basicKey = Object.keys(userBG);
  user_basicKey.forEach(key => {
    if (!key.match(/^(technologyExperience|name)$/)) {
      if (pref_basics[userBG[key]] !== undefined) {
        if (key.match(/^(achievement|commitment|gender)$/)) {
          weighted_score += 2;
        } else {
          basic_score++;
        }
      }
    }
  });

  var user_techKey = Object.keys(userBG.technologyExperience);
  user_techKey.forEach(key => {
    let tech_value_arr = userBG.technologyExperience[key];
    tech_value_arr.every(x => {
      if (pref_techs[x] !== undefined) {
        t_score++;
      }
    });
  });
  let base = 4;
  if (pref_tech_count == 0) {
    base -= 1;
  }
  if (pref_basic_count == 0) {
    base -= 1;
  }
  if (pref_weighted_count == 0) {
    base -= 2;
  }
  if (base == 0) {
    return 0;
  }
  if (pref_weighted_count != 0) {
    // console.log(
    //   user.name,
    //   '= ',
    //   t_score,
    //   '|',
    //   basic_score,
    //   '|',
    //   weighted_score,
    //   ' || ',
    //   base
    //   // pref_tech_count,
    //   // pref_basic_count,
    //   // pref_weighted_count
    // );

    return (
      (processNaN(t_score / pref_tech_count) +
        processNaN(basic_score / pref_basic_count) +
        processNaN(weighted_score / pref_weighted_count)) /
      base
    );
  } else {
    return (
      (processNaN(t_score / pref_tech_count) +
        processNaN(basic_score / pref_basic_count)) /
      2
    );
  }
}

export function processPrefs(currUser) {
  //O(n)
  var pref_basic_count = 0;
  var pref_weighted_count = 0;
  var pref_tech_count = 0;
  var pref_basic_arr = [];
  var pref_tech_arr = [];
  var pref_basics = {};
  var pref_techs = {};

  const obj_pref = {
    ...currUser.preferences,
    achievement: currUser.background.achievement
  };

  let allKeys = Object.keys(obj_pref);
  let techKeys = Object.keys(obj_pref.technologyExperience);
  allKeys.forEach(key => {
    if (key != 'technologyExperience' && key != 'biography') {
      // console.log(key);
      let value = obj_pref[key];
      if (value.length != 0) {
        if (key.match(/^(achievement|commitment|gender)$/)) {
          pref_weighted_count++;
        } else {
          pref_basic_count++;
        }
        if (key == 'achievement') {
          pref_basic_arr.push(value); // O(1)
        } else {
          pref_basic_arr.push(...value); // O(1)
        }
      }
    }
  });

  techKeys.forEach(key => {
    let value = obj_pref.technologyExperience[key];
    pref_tech_arr.push(...value); // O(1)
  });
  pref_tech_count = pref_tech_arr.length;

  pref_basic_arr.forEach((el, index) => {
    pref_basics[el] = index;
  });
  pref_tech_arr.forEach((el, index) => {
    pref_techs[el] = index;
  });

  return {
    pref_basic_count: pref_basic_count,
    pref_weighted_count: pref_weighted_count,
    pref_tech_count: pref_tech_count,
    pref_basics: pref_basics,
    pref_techs: pref_techs
  };
}

function processNaN(num) {
  return num ? num : 0;
}

export function sortScores(a, b) {
  let x = a.score;
  let y = b.score;
  if (x < y) {
    return 1;
  }
  if (x > y) {
    return -1;
  }
  return 0;
}
