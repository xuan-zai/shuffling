let lock = true;
let current = 0;
let index = 0;

function shuffling(shufflingContainer, moveContainer, leftBtn, RightBtn) {
    let ul = document.querySelector(moveContainer);
    let wrapper = document.querySelector(shufflingContainer);
    let left = document.querySelector(leftBtn);
    let right = document.querySelector(RightBtn);

    let point = createPoint(wrapper, ul);

    ul.appendChild(createLi());

    left.onclick = function () {
        direction('left', wrapper.clientWidth, ul)
    }

    right.onclick = function () {
        direction('right', wrapper.clientWidth, ul)
    }

    point.addEventListener("click", function (e) {
        if (e.target.className.indexOf("item") !== -1) {
            // 获取每个按钮当前的索引
            let index = e.target.getAttribute("data-index");
            // 根据当前索引和原索引来做判断是往哪个方向移动
            let direction = current > +index ? "right" : "left";

            if (lock) {
                current = +index;
                // 切换小按钮的选中状态
                handleActive(current, point)
                // 执行运动函数
                move(wrapper.clientWidth, 10, 30, current, direction, ul);
            }
        }
    });

    setInterval(function () {
        direction("left", wrapper.clientWidth, ul)
    }, 3000);

}

shuffling('.wrapper', 'ul', '.left', '.right')

function move(liwidth, interval, velocity, current, direction, moveContainer) {
    let width = liwidth * current;
    if (lock) {
        lock = false;
        let time = setInterval(function () {
            let speed = direction === 'left' ? Math.ceil((width - Math.abs(moveContainer.offsetLeft)) / velocity) : Math.floor((width - Math.abs(moveContainer.offsetLeft)) / velocity);
            if (!speed) {
                clearInterval(time);
                lock = true;
            } else {
                moveContainer.style.left = moveContainer.offsetLeft - speed + 'px';
            }
        }, interval)
    }
}

function direction(dir, liwidth, moveContainer) {
    if (lock) {
        if (dir === 'left') {
            if (current === moveContainer.children.length - 1) {
                moveContainer.style.left = 0;
                current = 1;
            } else {
                current++;
            }
        } else if (dir === 'right') {
            if (current === 0) {
                moveContainer.style.left = - ((moveContainer.children.length - 1) * liwidth) + 'px';
                current = moveContainer.children.length - 2;
            } else {
                current--;
            }
        }


        if (current === moveContainer.children.length - 1) {
            index = 0;
        } else {
            index = current;
        }

        handleActive(index, document.querySelector('.point-container'));

        move(liwidth, 10, 30, current, dir, moveContainer)
    }

}

function createLi() {
    return document.createElement('li')
}

function createPoint(shufflingContainer, moveContainer) {
    let point = document.createElement('div');
    point.classList = 'point-container';
    shufflingContainer.appendChild(point);

    [...moveContainer.children].forEach((ele, index) => {
        let item = document.createElement("div");
        if (current === index) {
            item.classList = "item active";
        } else {
            item.classList = "item";
        }
        item.setAttribute("data-index", index);
        point.appendChild(item);
    });

    return point;
}


function handleActive(index, container) {
    [...container.children].forEach(ele => {
        ele.className = 'item';
    });
    container.children[index].classList = 'item active';
}