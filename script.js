/* Classes */
class Git {
  constructor(name) {
    this.name = name;
    this.lastCommitId = -1;
    this.branches = [];
    var master = new Branch("master", null);
    this.branches.push(master);
    this.HEAD = master;
  }
}

class Commit {
  constructor(id, parent, message) {
    this.id = id;
    this.parent = parent;
    this.message = message;
  }
}

class Branch {
  constructor(name, commit) {
    this.name = name;
    this.commit = commit;
  }
}

Git.prototype.commit = function (message) {
  let commit = new Commit(++this.lastCommitId, this.HEAD.commit, message); // create a new commit
  this.HEAD.commit = commit;
  return commit;
};

Git.prototype.checkout = function (branchName) {
  for (var i = this.branches.length; i--; ) {
    if (this.branches[i].name === branchName) {
      console.log("Switched to existing branch: " + branchName);
      this.HEAD = this.branches[i];
      return this;
    }
  }

  let newBranch = new Branch(branchName, this.HEAD.commit);
  this.branches.push(newBranch);
  this.HEAD = newBranch;
  console.log("switched to new branch: " + branchName);
  return this;

  // We reach here when no matching branch is found.
};

Git.prototype.log = function () {
  var commit = this.HEAD.commit;
  var history = [];

  while (commit) {
    history.push(commit);
    commit = commit.parent;
  }
  return history;
};

/* Main */

/* Tests */
// console.log("Git.log() tests");
// var testRepo = new Git("test");
// testRepo.commit("initial commit");
// testRepo.commit("change 1");

// var log = testRepo.log();
// console.log(log);
// console.assert(log.length === 2); // length should be equal 2
// console.assert(log[0] && log[0].id === 1); // commit 1 should be first
// console.assert(log[1] && log[1].id === 0); // and then commit 0

// console.log("Git checkout() test");
// var testRepo = new Git("checkouts");
// console.assert(testRepo.HEAD.name === "master"); // Should be on master branch
// testRepo.checkout("testing");
// console.assert(testRepo.HEAD.name === "testing"); // Should be on testing branch
// testRepo.checkout("master");
// console.assert(testRepo.HEAD.name === "master"); // Should be on master branch
// testRepo.checkout("testing");
// console.assert(testRepo.HEAD.name === "testing"); // Should be on testing branch again

// console.log("Git checkout Ids test");
// let repoIds = new Git("ids test");
// repoIds.commit("Initial git");
// repoIds.commit("First commit");

// function historyToIdMapper(history) {
//   var ids = history.map((com) => com.id);
//   return ids.join("-");
// }

// console.assert(historyToIdMapper(repoIds.log()) === "1-0");
// repoIds.checkout("test");
// repoIds.commit("second commit");
// console.assert(historyToIdMapper(repoIds.log()) === "2-1-0");
// repoIds.checkout("master");
// console.assert(historyToIdMapper(repoIds.log()) === "1-0");
// repoIds.commit("third commit");
// console.assert(historyToIdMapper(repoIds.log()) === "3-1-0");
