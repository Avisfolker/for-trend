app.controller('task1Ctrl', function($http,$interval) {
    const vm = this;

    vm.getArrayApartments = () => $http.post('/api/getArrayApartments',{
    }).then( (data) => {
      if (data.status === 200) {
        console.log(data);
        vm.apartments = data.data.data;
      }
      else {
        console.log('Error: '+ data.msg);
      }
    });
  vm.getArrayApartments();
  $interval(() => {
    vm.getArrayApartments();
  }, 5000);
});


app.controller('task2Ctrl', function($http) {
  const vm = this;
  vm.asc = false; // for ascending order
  vm.orderProp = "blocks[0].blockPlanPercent";
  $http.post('/api/getRewardsForSubagents',{
  }).then( (data) => {
    if (data.status === 200) {
      vm.rewards = data.data.data;
    }
    else {
      console.log('Error: '+ data.msg);
    }
  });

});

