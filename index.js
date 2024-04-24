function CountFunction(){

    let w_nes = document.getElementById("w_nes").value;
    let w_inf = document.getElementById("w_inf").value;
    let U_nes = document.getElementById("U_nes").value;
    let U_inf = document.getElementById("U_inf").value;
    w_inf = w_inf * 2 * Math.PI
    w_nes = w_nes * 2 * Math.PI
    let m = U_inf/U_nes;
    let n = 3
    let messageElement = document.getElementById("message");
    if (w_inf == 0 || w_nes == 0 || U_nes == 0 || U_inf == 0){
        messageElement.textContent = "Ошибка: значения частот и амплитуд должны быть ненулевыми";
        return false;
    }
    if (parseFloat(w_nes) - parseFloat(w_inf) < 0) {
        n = parseFloat(w_inf)/parseFloat(w_nes)*4
    }
    if (m > 1) {
        messageElement.textContent = "Предупреждение: перемодуляция";
    } else {
        messageElement.textContent = "";
    }

    steps = n * 2*Math.PI/parseFloat(w_inf);
    console.log(n)

    //все единицы измерения в  СИ
    let t = [];
    let A_Res = [];
    let A_nes = []
    let A_inf = []
    let spectr_res = []
    let spectr_nes = []
    let spectr_inf = []
    let freqs = []
    
    for(let i = 0; i < steps; i+=0.0001)
    {
        t.push(i);
        A_Res.push(U_nes*(1 + m*Math.cos(w_inf * i))*Math.cos(w_nes * i));
        A_nes.push(U_nes*Math.cos(w_nes * i))
        A_inf.push(U_inf*Math.cos(w_inf * i))
    }
    console.log("w_new", parseFloat(w_nes)/2/Math.PI)
    for (let f = -(parseFloat(w_nes) + parseFloat(w_inf))*1.5/2/Math.PI; f < (parseFloat(w_nes) + parseFloat(w_inf))*1.5/2/Math.PI; f+=0.001)
    {
        let inf_v = 0
        let nes_v = 0
        let res_v = 0
        freqs.push(f)
        
        if (Math.abs(f - parseFloat(w_nes)/2/Math.PI) < 0.0005) {
            nes_v = U_nes
            res_v = U_nes
            console.log(f)
        }
        if (Math.abs(f - parseFloat(w_inf)/2/Math.PI) < 0.00005) inf_v = U_inf
        if (Math.abs(f - (parseFloat(w_nes) - parseFloat(w_inf))/2/Math.PI) < 0.0005 || Math.abs(f - (parseFloat(w_nes) + parseFloat(w_inf))/2/Math.PI) < 0.0005) {
            res_v = U_nes*m/2
        }
        
        spectr_res.push(res_v)
        spectr_nes.push(nes_v)
        spectr_inf.push(inf_v)
    }
    
    

    let layout_1 = {
        title: 'Модулированный сигнал',
        xaxis: {
            title: 'Время t (c)'
        },
        yaxis: {
            title: 'Отклонение (B)'
        }
    };
    let layout_2 = {
        title: 'Несущий сигнал',
        xaxis: {
            title: 'Время t (c)'
        },
        yaxis: {
            title: 'Отклонение (B)'
        }
    };

    let layout_3 = {
        title: 'Информационный сигнал',
        xaxis: {
            title: 'Время t (c)'
        },
        yaxis: {
            title: 'Отклонение (B)'
        }
    };
    let layout_4 = {
        title: 'Спектр модулированного сигнала',
        xaxis: {
            title: 'Частота (Гц)'
        },
        yaxis: {
            title: 'Амплитуда (B)'
        }
    };
    let layout_5 = {
        title: 'Спектр несущего сигнала',
        xaxis: {
            title: 'Частота (Гц)'
        },
        yaxis: {
            title: 'Амплитуда (B)'
        }
    };
    let layout_6 = {
        title: 'Спектр информационного сигнала',
        xaxis: {
            title: 'Частота (Гц)'
        },
        yaxis: {
            title: 'Амплитуда (B)'
        }
    };

    
    Plotly.newPlot(
        "myDiv_1",
        [{
            mode: 'lines',
            type: 'scatter',
            x: t,
            y: A_Res,
        }],
        layout_1
    );
    Plotly.newPlot(
        "myDiv_2",
        [{
            mode: 'lines',
            type: 'scatter',
            x: t,
            y: A_nes,
        }],
        layout_2
    );
    Plotly.newPlot(
        "myDiv_3",
        [{
            mode: 'lines',
            type: 'scatter',
            x: t,
            y: A_inf,
        }],
        layout_3
    );
    Plotly.newPlot(
        "myDiv_4",
        [{
            mode: 'lines',
            type: 'scatter',
            x: freqs,
            y: spectr_res,
        }],
        layout_4
    );
    Plotly.newPlot(
        "myDiv_5",
        [{
            mode: 'lines',
            type: 'scatter',
            x: freqs,
            y: spectr_inf,
        }],
        layout_6
    );
    Plotly.newPlot(
        "myDiv_6",
        [{
            mode: 'lines',
            type: 'scatter',
            x: freqs,
            y: spectr_nes,
        }],
        layout_5
    );

    return false;
}
