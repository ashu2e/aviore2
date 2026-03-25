const m = async () => {
    let cookie;
    const login = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({email:'seller200@test.com', password:'password'})
    });
    if (login.status !== 200) {
      const signup = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name:'seller200', email:'seller200@test.com', password:'password', role:'seller'})
      });
      cookie = signup.headers.get('set-cookie');
    } else {
      cookie = login.headers.get('set-cookie');
    }
  
    const res = await fetch('http://localhost:3000/api/listings', {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'Cookie': cookie },
      body: JSON.stringify({ title: 'test', description: 'test', price: '10', type: 'Product', category: 'Testing', img: '!' })
    });
    console.log("POST RESULT:", res.status, await res.text());
  };
  m();
