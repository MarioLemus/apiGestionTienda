export class UserController {
  static async getAll (req, res) {
    res.send('Get users')
  }

  static async create (req, res) {
    res.send('Create user')
  }

  static async getOne (req, res) {
    res.send('Get user')
  }

  static async updateOne (req, res) {
    res.send('Update user')
  }

  static async deleteOne (req, res) {
    res.send('Delete user')
  }
}
