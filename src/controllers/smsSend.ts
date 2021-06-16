import FormData from 'form-data'
import axios from 'axios'

const smsSend = async (phone_number: number, code: number) => {
    const data = new FormData()
    data.append('mobile_phone', phone_number)
    data.append('message', code)
    data.append('from', '4546')
    data.append('callback_url', 'http://0000.uz/test.php')

    const response = await axios({
        method: 'post',
        url: 'https://notify.eskiz.uz/api/message/sms/send',
        headers: {
            Authorization:
                'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvbm90aWZ5LmVza2l6LnV6XC9hcGlcL2F1dGhcL2xvZ2luIiwiaWF0IjoxNjIyNTYxNTI2LCJleHAiOjE2MjUxNTM1MjYsIm5iZiI6MTYyMjU2MTUyNiwianRpIjoiT00xWlhBbDlmNlJoVkRVciIsInN1YiI6NDE0LCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.wwI2SEa3_5zSR4X8GxBJz-ld4X7bOWdNix06IaVhlPI',
            ...data.getHeaders()
        },
        data: data
    })

    return response
}

export default smsSend
